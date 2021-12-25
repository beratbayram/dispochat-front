import './Modal.sass'

export default function Modal({title, children, closeModal}) {
    return (
        <div className="Modal">
            <div className="Modal-inner">
                <header>
                    <h2>{title}</h2>
                    <button type="button" onClick={closeModal}>X</button>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}