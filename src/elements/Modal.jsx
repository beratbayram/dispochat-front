export default function Modal({isOpen,setIsOpen,title,children}) {
    if(!isOpen) return null;
    return (
        <div id="modal">
            <header>
                <h2>{title}</h2>
                <button type="button" onClick={()=>setIsOpen(false)}>X</button>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}
