import { Categories } from '../constants/categories';
import { SortingTypes } from '../constants/sortingTypes';
const EstateFiltering = ({ 
    setSortingType,
    setCategory,
    setSearchTerm,
    handlePreviousPage,
    currentPage,
    handleNextPage
} : {
    setSortingType: Function,
    setCategory: Function,
    setSearchTerm: Function,
    handlePreviousPage: () => void,
    currentPage: number,
    handleNextPage: () => void

}) => {
	return (
		<>
			<div
				className="flex flex-col sm:flex-row items-center justify-between mt-5 wrap-anywhere gap-4"
				role="navigation"
				aria-label="Estate controls"
			>
				<Sorting setSortingType={setSortingType} />
				<CategoryFiltering setCategory={setCategory} />
				<SearchBar setSearchTerm={setSearchTerm} />
			</div>
			<PaginationController
				handlePreviousPage={handlePreviousPage}
				currentPage={currentPage}
				handleNextPage={handleNextPage}
			/>
		</>
	)
}

export default EstateFiltering

const PaginationController = ({
	handlePreviousPage,
	currentPage,
	handleNextPage,
}: {
	handlePreviousPage: () => void
	currentPage: number
	handleNextPage: () => void
}) => {
	return (
		<div className="flex justify-center w-full">
			<div className="flex justify-around items-center w-1/2">
				<button
					className="cursor-pointer p-2 bg-amber-500 rounded-2xl text-black text-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					aria-label="Go to previous page"
				>
					Previous
				</button>
				<span
					className="text-lg"
					aria-live="polite"
				>
					Page {currentPage} of &infin;
				</span>
				<button
					className="cursor-pointer p-2 bg-amber-500 rounded-2xl text-black text-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
					onClick={handleNextPage}
					aria-label="Go to next page"
				>
					Next
				</button>
			</div>
		</div>
	)
}

const SearchBar = ({ setSearchTerm }: { setSearchTerm: Function }) => {
	return (
		<div className="w-full sm:w-1/3 px-0 sm:px-5">
			<label
				htmlFor="search-input"
				className="sr-only"
			>
				Search estates
			</label>
			<input
				id="search-input"
				type="search"
				placeholder="Search estates..."
				className="w-full max-w-xs mx-auto block p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
				onChange={(e) => setSearchTerm(e.target.value)}
				aria-label="Search estates"
			/>
		</div>
	)
}

const CategoryFiltering = ({ setCategory }: { setCategory: Function }) => {
	return (
		<div className="flex w-full sm:w-1/3 justify-center items-center">
			<label
				htmlFor="category-select"
				className="sr-only"
			>
				Filter by category
			</label>
			<select
				id="category-select"
				onChange={(e) => setCategory(JSON.parse(e.target.value))}
				className="p-2 bg-white dark:bg-sky-200 border border-gray-300 dark:border-gray-600 rounded-lg text-black cursor-pointer w-full max-w-xs"
				aria-label="Filter by category"
			>
				{Categories.map((item, index) => (
					<option
						value={JSON.stringify(item)}
						key={index}
						className="text-black dark:text-black bg-white dark:bg-sky-200"
					>
						{item.text}
					</option>
				))}
			</select>
		</div>
	)
}

const Sorting = ({ setSortingType }: { setSortingType: Function }) => {
	return (
		<div className="flex w-full sm:w-1/3 justify-center items-center">
			<label
				htmlFor="sort-select"
				className="sr-only"
			>
				Sort estates
			</label>
			<select
				id="sort-select"
				onChange={(e) => setSortingType(JSON.parse(e.target.value))}
				className="p-2 bg-white dark:bg-sky-200 border border-gray-300 dark:border-gray-600 rounded-lg text-black cursor-pointer w-full max-w-xs"
				aria-label="Sort estates"
			>
				{SortingTypes.map((item, index) => (
					<option
						value={JSON.stringify(item)}
						key={index}
						className="text-black dark:text-black bg-white dark:bg-sky-200"
					>
						{item.text}
					</option>
				))}
			</select>
		</div>
	)
}
