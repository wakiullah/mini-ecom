import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, open }) {
    const dialogRef = useRef()
    useEffect(() => {

        if (open) {
            dialogRef.current.showModal()
        }
        if (!open) {
            dialogRef.current.close()
        }
    }, [open])


    return createPortal(<dialog ref={dialogRef}>{children} </dialog>, document.getElementById('modal'))
}
