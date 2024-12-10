@extends('admin.layouts.app')

@section('title')
    Plans
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
                        Plans ({{ $plans->count() }})
                    </h3>
                    <a href="{{route('admin.plans.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Hearts</td>
                                <td>Price</td>
                                <td>Stripe Price ID</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($plans as $key => $plan)
                                <tr>
                                    <td>{{ $key += 1 }}</td>
                                    <td>{{ $plan->name }}</td>
                                    <td>{{ $plan->number_of_hearts }}</td>
                                    <td>${{ $plan->price }}</td>
                                    <td>{{ $plan->price_id }}</td>
                                    <td>
                                        <a href="{{route('admin.plans.edit',$plan->id)}}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$plan->id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$plan->id}}" action="{{route('admin.plans.destroy',$plan->id)}}" method="post">
                                            @csrf
                                            @method('DELETE')
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection