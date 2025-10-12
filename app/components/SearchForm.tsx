import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'

function SearchForm() {
  const query = 'test'

  return (
    <Form
      action='/'
      className='search-form'
      scroll={false}
    >
      <input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search Startups'
      />
      <div className='flex gap-2'>
        {query && (
          <SearchFormReset />
        )}
        <button
          type='submit'
          className='search-btn text-white'
        >
          S
        </button>
      </div>



    </Form>
  )
}

export default SearchForm