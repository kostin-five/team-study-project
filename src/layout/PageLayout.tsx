import React from "react";
 import { Layout, Breadcrumb } from "antd";
 import { Outlet, useLocation, Link } from "react-router-dom";
 import Header from "./Header";
 import Sidebar from "./Sidebar";
 const { Content } = Layout;
 const PageLayout: React.FC = () => {
   const location = useLocation();
   // Определяем элементы хлебных крошек в зависимости от текущего маршрута
   const breadcrumbItems = [
     <Breadcrumb.Item key="home">
       <Link to="/">Главная</Link>
     </Breadcrumb.Item>
   ];
   if (location.pathname.includes("/project/")) {
     breadcrumbItems.push(
       <Breadcrumb.Item key="project">Детали проекта</Breadcrumb.Item>
       
  ); }
   if (location.pathname === "/profile") {
     breadcrumbItems.push(
       <Breadcrumb.Item key="profile">Профиль</Breadcrumb.Item>
     );
}
   return (
     <Layout style={{ minHeight: "100vh" }}>
       <Header />
       <Layout>
         <Sidebar />
         <Content style={{ padding: "16px" }}>
           <Breadcrumb>{breadcrumbItems}</Breadcrumb>
           {/* Контент текущей страницы */}
           <Outlet />
         </Content>
       </Layout>
</Layout> );
 };
 export default PageLayout;