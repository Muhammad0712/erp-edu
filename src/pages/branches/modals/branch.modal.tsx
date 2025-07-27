import React from 'react'
import type { BranchesType, ModalProps } from '@types'

interface BranchProps extends ModalProps{
    update: BranchesType | null;
}

const BranchModal = ({open, toggle, update}: BranchProps) => {
    console.log('BranchModal', { open, toggle, update });
  return (
    <div>BranchModal</div>
  )
}

export default BranchModal