@extends('admin.layouts.app')

@section('title')
    Synonyms
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
                        Synonyms ({{ $synonyms->count() }})
                    </h3>
                    <a href="{{route('admin.synonyms.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Word</td>
                                <td>Similar</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($synonyms as $key => $synonym)
                                <tr>
                                    <td>{{ $key += 1 }}</td>
                                    <td>{{ $synonym->word->name }}</td>
                                    <td>
                                        @foreach (explode(',', $synonym->similars) as $similar)
                                            <span class="badge bg-dark">
                                                {{ $similar }}
                                            </span>
                                        @endforeach
                                    </td>
                                    <td>
                                        <a href="{{route('admin.synonyms.edit',$synonym->id)}}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$synonym->id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$synonym->id}}" action="{{route('admin.synonyms.destroy',$synonym->id)}}" method="post">
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