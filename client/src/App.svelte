<script>
    import { Router, Route } from "svelte-navigator";
    import { user } from "./stores/userStore.js";
    import { BASE_URL } from "./stores/globalsStore.js";
    import Navbar from "./components/navbar/Navbar.svelte";
    import Footer from "./components/footer/Footer.svelte";
    import Home from "./pages/home/Home.svelte";
    import Login from "./pages/login/Login.svelte";
    import Register from "./pages/register/Register.svelte";
    import ForgotPassword from "./pages/forgot_password/ForgotPassword.svelte";
    import ResetPassword from "./pages/reset_password/ResetPassword.svelte";
    import PrivateRoute from "./PrivateRoute.svelte";
    import toastr from "toastr";


    async function handleLogout() {
        const response = await fetch($BASE_URL + "/api/logout", {
            method: "POST",
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.error(data.message);
            user.set(null);
            $user = null;        
        } else {
            toastr.error(data.message);
        }
    }

</script>

<Router>
    <Navbar />
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password/:token" component={ResetPassword} />
    <PrivateRoute path="/profile" let:location>
        <button on:click={handleLogout}>Logout</button>
    </PrivateRoute>
</Router>
<Footer />
