import Layout from '@/layout/Layout';

type Props = {
  children: JSX.Element | JSX.Element[],
};

const App = ({ children }: Props) => {
  return (
    <Layout>
      <>
        {children}
      </>
    </Layout>
  );
};

export default App