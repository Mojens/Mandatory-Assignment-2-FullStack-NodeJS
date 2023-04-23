<script>
    import { Router, Route } from "svelte-navigator";
    import Navbar from "./components/navbar/Navbar.svelte";
    import Footer from "./components/footer/Footer.svelte";
    import Home from "./pages/home/Home.svelte";
    import Login from "./pages/login/Login.svelte";
    import Register from "./pages/register/Register.svelte";
    import ForgotPassword from "./pages/forgot_password/ForgotPassword.svelte";
    import ResetPassword from "./pages/reset_password/ResetPassword.svelte";
    import PrivateRoute from "./PrivateRoute.svelte";
    import Profile from "./pages/profile/Profile.svelte";
</script>

<Router>
    <Navbar />
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password/:token" component={ResetPassword} />
    <PrivateRoute path="/profile" let:location>
        <Profile />
    </PrivateRoute>
</Router>
<Footer />
