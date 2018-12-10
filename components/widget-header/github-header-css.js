const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="widget-header-css">
	<template>
        <style>
			:host {
                display: block;
                height: 70px;
                width: 100%;
                background: #147ABC;
            }

            .container {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 100%;
                padding-right: 12px;
            }

            .container__part {
                width: 45%;
            }

            .input-box {
                border: 1px solid gray;
                width: 100%;
                outline: none;
                border-radius: 4px;
                padding:8px;
                box-sizing: border-box;
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);