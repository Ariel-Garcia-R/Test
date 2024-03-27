<template>
    <LayoutTopBar></LayoutTopBar>
    <TasksApp />
</template>

<style>
* {
    font-family: Roboto Mono;
    user-select: none;
}

body {
    font-size: 16px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 4.8px !important;
    border: 1px solid #8A94A6;
}   

input[type="checkbox"]:checked {
    background-color: red;
    background: url(/assets/checkbox.png) center;
    background-size: 34px 34px;
    border: none
}

.gradient-title {
 color: #007BFF;
 background-image: linear-gradient(to right, #0D55CF, #64acff);
 background-clip: text;
 -webkit-background-clip: text;
 background-clip: text;
 color: transparent;
}

.pill{
    height: 24px; 
    align-items: center; 
    font-weight: 500; 
    border-radius: 12px; 
    padding: 1px 8px; 
    /* font-size: 0.875rem */
}

.contact-pill{
    background-color: #ADF0D9; 
    color: #07A873;
}

.email-pill{
    background-color: #FFE6C7;
    color: #F58E0A;
}

.hashtag-pill{
    background-color: #DBC7FF; 
    color: #702EE6;
}

.link-pill{
    background-color: #D6EBFF; 
    color: #007FFF;
}

.no-wrap {
    white-space: nowrap;
    overflow: hidden; /* Oculta el texto que excede el ancho del contenedor */
    text-overflow: ellipsis; /* Muestra puntos suspensivos si el texto excede el ancho del contenedor */
 }
</style>