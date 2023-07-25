const SearchItem = ({ search, setSearch }) => {
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="Search"></label>
            <input
                id='search'
                type="text"
                role="searchbox"
                placeholder="Search Items"
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default SearchItem