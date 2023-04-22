<script>
    import { Router, Route } from "svelte-navigator";
    import Navbar from "./components/navbar/Navbar.svelte";
    import Footer from "./components/footer/Footer.svelte";
    import Home from "./pages/home/Home.svelte";
    import Login from "./pages/login/Login.svelte";

</script>

<Router>
    <Navbar/>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
</Router>
<Footer/>