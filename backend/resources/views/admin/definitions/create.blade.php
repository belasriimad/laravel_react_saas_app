@extends('admin.layouts.app')

@section('title')
    Add new definition
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
                        Add new definition
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <form action="{{route('admin.definitions.store')}}" method="post">
                                @csrf
                                <div class="mb-3">
                                    <label for="word_id" class="form-label">Word*</label>
                                    <select
                                        class="form-select @error('word_id') is-invalid @enderror"
                                        name="word_id"
                                        id="word_id"
                                    >
                                        <option selected disabled value="">Select one word</option>
                                        @foreach ($words as $word)
                                            <option value="{{$word->id}}"
                                                @selected(old('word_id') == $word->id) 
                                            >
                                                {{ $word->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('word_id')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="meaning" class="form-label">Meaning*</label>
                                    <textarea class="form-control @error('meaning') is-invalid @enderror"
                                        name="meaning" id="meaning" rows="3" placeholder="Meaning*">{{old('meaning')}}</textarea>
                                    @error('meaning')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="part_of_speech" class="form-label">Part of speech*</label>
                                    <input
                                        type="text"
                                        class="form-control @error('part_of_speech') is-invalid @enderror"
                                        name="part_of_speech"
                                        id="part_of_speech"
                                        value="{{old('part_of_speech')}}"
                                        placeholder="Part of speech*"
                                    />
                                    @error('part_of_speech')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="example_sentence" class="form-label">Example*</label>
                                    <textarea class="form-control @error('example_sentence') is-invalid @enderror" name="example_sentence" id="example_sentence" rows="3">{{old('example_sentence')}}</textarea>
                                    @error('example_sentence')
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