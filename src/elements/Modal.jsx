import './Modal.sass'

export default function Modal({state, title, children}) {
    const [open, setOpen] = state;
    if (!open)
        return null;
    else
        return (
            <div className="Modal">
                <div className="Modal-inner">
                    <header>
                        <h2>{title}</h2>
                        <button type="button" onClick={() => setOpen(false)}>X</button>
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        )
}