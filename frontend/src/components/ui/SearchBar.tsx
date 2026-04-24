
export default function SearchBar () {
    return (
        <div
        className="flex
        w-full
        p-2
        items-center
        justify-center
        bg-(--component-bg)
        border-2
        border-(--border-color)
        rounded-lg"
        >
            <p className="flex w-full text-base text-(--alternative-text) text-left">O que você procura? (ex: Eletricista)</p>
            <button
                className="bg-(--primary-color) rounded-lg text-lg text-(--button-item) py-2 px-4"
            >
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}