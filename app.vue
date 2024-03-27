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
</style>