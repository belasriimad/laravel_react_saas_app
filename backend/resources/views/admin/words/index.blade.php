@extends('admin.layouts.app')

@section('title')
    Words
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
                        Words ({{ $words->count() }})
                    </h3>
                    <a href="{{route('admin.words.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Slug</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($words as $key => $word)
                                <tr>
                                    <td>{{ $key += 1 }}</td>
                                    <td>{{ $word->name }}</td>
                                    <td>{{ $word->slug }}</td>
                                    <td>
                                        <a href="{{route('admin.words.edit',$word->slug)}}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$word->id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$word->id}}" action="{{route('admin.words.destroy',$word->slug)}}" method="post">
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