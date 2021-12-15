<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" type="image/png" href="{{ asset('images/icon.ico') }}">
    <title>Arabito</title>

    <script src="{{ asset('js/app.js') }}"></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/table/table.css') }}" rel="stylesheet">
   
    @yield("scripts")
</head>
<body>
   {{--  <nav class="nav-app">
        
        <img src="{{ asset('images/sinapsis/sinapsis.svg') }}" alt="logo sinapsis" height="100%">
        <div class="nav-right">
            @if (!session()->has('role'))
                
                    <a class="mr-2 btn btn-outline-primary" href="{{ route('home') }}">Inicio</a>
                

                @if (Route::currentRouteName()!='register')
                    <a class="mr-2 btn btn-primary" href="{{ route('register') }}">Nuevo ingreso</a>
                @endif
            @else
                <ul class="navbar-nav mr-2">
                  <li class="nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                        <span class="badge badge-primary">
                            {{ session("carrera") }}
                        </span>
                        <span class="badge badge-dark">
                            {{ session("role")==1?"Administrativo":"" }}
                            {{ session("role")==2?"Profesor":"" }}
                            {{ session("role")==3?"Estudiante":"" }}
                        </span>
                        {{ session("usuario") }}
                        <span class="caret"></span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        @if (session("role")==3)
                            @if (session("verificado"))
                                <a class="dropdown-item bg-success text-light">Verificado</a>
                            @else
                                <a class="dropdown-item bg-primary text-light">En espera</a>
                                <a class="dropdown-item" href="/estudiante/modificar">Modificar mis datos <i className="fa fa-pencil hover pointer"></i></a>
                            @endif
                                <a class="dropdown-item" href="/estudiante/constancia" target="_blank">Constancia de estudio <i className="fa fa-download hover pointer"></i></a>


                            
                        @endif
                        <a class="dropdown-item text-muted" href="#">
                            
                        </a>
                        <a class="dropdown-item" href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();">
                            Cerrar Sesión
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                  </li>
                </ul>
            @endif
        </div>
    </nav> --}}
    <section class="content">
        
        @yield('nav')
        
        <div id="app"></div>
        
        @yield('content')
    </section> 
    
    
</body>
</html>
