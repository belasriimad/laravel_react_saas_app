<?php

namespace App\Http\Controllers\Api;

use Stripe\Stripe;
use App\Models\Plan;
use Stripe\Customer;
use Stripe\PaymentMethod;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Stripe\Subscription as StripeSubscription;

class SubscriptionController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey('sk_test_51C19VNGin0JfRTbQ3A3KUsAFxkqxCBpIiRWUpAcDEjJ5Vw6tWvegkTCpktFf94ggJfRFTQQQTYufqJHrNN3CN2Ft00NG29jI5y');
    }
    /**
     * Get all the plans
     *
     * @return void
     */
    public function index()
    {
        $plans = Plan::all();
        return response()->json([
            'plans' => $plans
        ]);
    }

    //This method creates a Stripe customer 
    //if not already created and then subscribes them to a plan.
    public function create(Request $request)
    {
        $user = $request->user();
        $plan = Plan::find($request->plan_id);

        try {

            // Create Stripe customer if not already created
            if (!$user->stripe_id) {
                $customer = Customer::create([
                    'email' => $user->email,
                ]);

                // Save the stripe_id to the user
                $user->stripe_id = $customer->id;
                $user->save();
            }

            // Retrieve the PaymentMethod ID from the request
            $paymentMethodId = $request->payment_method;

            // Attach the PaymentMethod to the customer
            // if it's not already attached
            $paymentMethod = PaymentMethod::retrieve($paymentMethodId);
            $paymentMethod->attach(['customer' => $user->stripe_id]);

            // Set the PaymentMethod as the default for the customer
            // Update the customer
            Customer::update($user->stripe_id, [
                'invoice_settings' => [
                    'default_payment_method' => $paymentMethodId
                ]
            ]);

            // Create the subscription
            $subscription = StripeSubscription::create([
                'customer' => $user->stripe_id,
                'items' => [['price' => $request->price_id]],
                'expand' => ['latest_invoice.payment_intent'],
                'default_payment_method' => $paymentMethodId
            ]);

            // Store subscription in local database
            $userSubscription = Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'stripe_subscription_id' => $subscription->id,
                'stripe_status' => $subscription->status,
                'stripe_plan_id' => $request->price_id,
                'current_period_start' => $subscription->current_period_start,
                'current_period_end' => $subscription->current_period_end,
            ]);

            // Update user number of hearts
            $user->number_of_hearts = $plan->number_of_hearts;
            $user->save();

            return response()->json(
                [
                    'subscription' => $userSubscription,
                    'message' => 'Subscription done successfully'
                ]
            , 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    //This method cancels a user's active subscription.
    public function cancel(Request $request)
    {
        $user = $request->user();
        $subscription = Subscription::where(
            [
                'user_id' => $user->id,
                'stripe_subscription_id' => $request->stripe_subscription_id
            ]
        )->first();
        
        if ($subscription) {
            $stripeSubscription = StripeSubscription::retrieve($subscription->stripe_subscription_id);
            $stripeSubscription->cancel();
            
            // delete subscription
            $subscription->delete();

            // Update user stripe id
            $user->stripe_id = null;
            $user->save();

            return response()->json(
                [
                    'user' => UserResource::make($user),
                    'message' => 'Subscription canceled successfully'
                ]
            , 200);
        }

        return response()->json(['error' => 'No active subscription found'], 400);
    }

    //decrement user hearts
    public function decrementUserHearts(Request $request)
    {
        $user = $request->user();
        $user->decrement('number_of_hearts');
        return response()->json(
            [
                'user' => UserResource::make($user),
            ]
        , 200);
    }
}
