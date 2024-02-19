import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { Provider } from 'mobx-react'
import { withRouter } from 'next/router'
import Page from '../components/Page';
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {

    return (
        <Provider >
            <React.Fragment>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </React.Fragment>
        </Provider>
    )
}

export default withRouter(MyApp)
