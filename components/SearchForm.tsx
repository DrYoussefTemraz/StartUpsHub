import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

function SearchForm({query}: {query?: string}) {

  return (
    <Form
      action='/'
      className='search-form'
      scroll={false}
    >
      <input
        name='query'
        defaultValue={query || ''}
        className='search-input'
        placeholder='Search Achievments'
      />
      <div className='flex gap-2'>
        {query && (
          <SearchFormReset />
        )}
        <Button
          type='submit'
          className='search-btn text-white'
        >
        <Search className='size-5'/>
        </Button>
      </div>



    </Form>
  )
}

export default SearchForm