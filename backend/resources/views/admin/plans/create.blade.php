@extends('admin.layouts.app')

@section('title')
    Add new plan
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header bg-white">
                    <h3 class="mt-2">
                        Add new plan
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <form action="{{route('admin.plans.store')}}" method="post">
                                @csrf
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name*</label>
                                    <input
                                        type="text"
                                        class="form-control @error('name') is-invalid @enderror"
                                        name="name"
                                        id="name"
                                        value="{{old('name')}}"
                                        placeholder="Name*"
                                    />
                                    @error('name')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="number_of_hearts" class="form-label">Hearts*</label>
                                    <input
                                        type="number"
                                        class="form-control @error('number_of_hearts') is-invalid @enderror"
                                        name="number_of_hearts"
                                        id="number_of_hearts"
                                        value="{{old('number_of_hearts')}}"
                                        placeholder="Hearts*"
                                    />
                                    @error('number_of_hearts')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="price" class="form-label">Price*</label>
                                    <input
                                        type="number"
                                        class="form-control @error('price') is-invalid @enderror"
                                        name="price"
                                        id="price"
                                        value="{{old('price')}}"
                                        placeholder="Price*"
                                    />
                                    @error('price')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="price_id" class="form-label">Stripe Price ID*</label>
                                    <input
                                        type="text"
                                        class="form-control @error('price_id') is-invalid @enderror"
                                        name="price_id"
                                        id="price_id"
                                        value="{{old('price_id')}}"
                                        placeholder="Stripe Price ID*"
                                    />
                                    @error('price_id')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <button
                                    type="submit"
                                    class="btn btn-sm btn-dark"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection