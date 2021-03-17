import * as React from 'react';
import Wrapper from "../hoc/Wrapper";
import Header from "./Header";

interface Props {children: any}

const Layout: React.FC = (props: Props) =>  {
    return (
        <Wrapper>
            {/*<Header />*/}
            <main>
                {props.children}
            </main>
        </Wrapper>
    );
}

export default Layout;