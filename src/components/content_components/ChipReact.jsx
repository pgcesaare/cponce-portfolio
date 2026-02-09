const ChipReact = ({ children }) => {
    return(
        <div className="w-fit h-7.5 py-2 px-2 flex items-center justify-center rounded-[10px] border border-accent-primary bg-bg-elevated">
            <p className="text-secondary-text text-accent-primary">{children}</p>
        </div>
    )
}

export default ChipReact