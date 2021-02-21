import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2>page comp</h2>
      {children}
    </div>
  );
}
