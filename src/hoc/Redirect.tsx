import { connect } from 'react-redux'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { appDispatchType, appStateType } from '../redux/store'

type mstpType = {
    isAuthorized: boolean
}

type mdtpType = {}

const mstp = (state: appStateType): mstpType => {
    return {
        isAuthorized: state.auth.isAuthorized,
    }
}

const mdtp = (dispatch: appDispatchType): mdtpType => {
    return {}
}

function Redirect<PropsType>(PassedComponent: React.ComponentType<PropsType>) {
    function RedirectComponent(props: mdtpType & mstpType) {
        const { isAuthorized, ...restProps } = props

        if (!props.isAuthorized) {
            return <Navigate to="/login" />
        }
        return (
            <PassedComponent
                {...(restProps as PropsType & JSX.IntrinsicAttributes)}
            />
        )
    }

    return connect(mstp, mdtp)(RedirectComponent)
}

export default Redirect
