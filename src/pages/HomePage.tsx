import Layout from "../components/layout.component";

const HomePage = () => {

  return (
    <Layout title="Gestión de Usuarios">
      <div
        style={{
          height: "calc(100vh - 60px)",
          background: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <h1>👋 Hola, estás autenticado</h1>
      </div>
    </Layout>
  );
};

export default HomePage;
