@extends('admin.layouts.app')

@section('title')
    Subscriptions
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">
                        Subscriptions ({{ $subscriptions->count() }})
                    </h3>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Plan</td>
                                <td>User</td>
                                <td>Status</td>
                                <td>Starting from</td>
                                <td>Ending on</td>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($subscriptions as $key => $subscription)
                                <tr>
                                    <td>{{ $key += 1 }}</td>
                                    <td>{{ $subscription->plan->name }}</td>
                                    <td>{{ $subscription->user->email }}</td>
                                    <td>
                                        <span class="badge bg-success p-2">
                                            {{ $subscription->stripe_status }}
                                        </span>
                                    </td>
                                    <td>{{ $subscription->current_period_start }}</td>
                                    <td>{{ $subscription->current_period_end }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection