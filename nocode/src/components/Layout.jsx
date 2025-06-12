import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} 冰淇淋销售系统 - 版权所有
        </div>
      </footer>
    </div>
  );
};

export default Layout;
