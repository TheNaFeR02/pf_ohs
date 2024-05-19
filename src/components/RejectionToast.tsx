import React from 'react'
import { toast } from './ui/use-toast'

interface RejectionToastProps {
    resourceType: string;
    operation: string;
    }

const RejectionToast = ({ resourceType, operation }: RejectionToastProps) => {
  return (
    toast({
        title: `${resourceType} ${operation}`,
        description: `Failed to ${operation} ${resourceType.toLowerCase()}`,
        variant: "destructive",
        }
    )
  )
}

export default RejectionToast