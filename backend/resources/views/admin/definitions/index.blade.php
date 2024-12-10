@extends('admin.layouts.app')

@section('title')
    Definitions
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
                        Definitions ({{ $definitions->count() }})
                    </h3>
                    <a href="{{route('admin.definitions.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Word</td>
                                <td>Meaning</td>
                                <td>Part of speech</td>
                                <td>Example</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($definitions as $key => $definition)
                                <tr>
                                    <td>{{ $key += 1 }}</td>
                                    <td>{{ $definition->word->name }}</td>
                                    <td>{{ $definition->meaning }}</td>
                                    <td>{{ $definition->part_of_speech }}</td>
                                    <td>{{ $definition->example_sentence }}</td>
                                    <td>
                                        <a href="{{route('admin.definitions.edit',$definition->id)}}" class="btn btn-sm btn-warning mb-1">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$definition->id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$definition->id}}" action="{{route('admin.definitions.destroy',$definition->id)}}" method="post">
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