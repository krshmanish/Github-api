const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="card-details-css">
	<template>
        <style>
			:host {
                font-family: lato;
                display: block;
                min-height: 80px;
                width: 100%;
                background: white;
                box-shadow: 0px 0px 11px 0px #888888;
                border-radius: 5px;
                margin-bottom: 12px;
                box-sizing: border-box;
            }

            .profile-card {
                display: flex;
                padding: 12px;
                border-bottom: 1px solid #F9F9F9;
            }

                .profile-card__img {
                    width: 16%;
                    display: flex;
                    justify-content: center;
                    padding-right: 12px;
                    box-sizing: border-box;
                }

                .repo-icon {
                    width: 50px;
                    height: 45px;
                    border: 1px solid black;
                    border-radius: 50%;
                }

                .profile-card__desc {
                    width: 64%;
                    box-sizing: border-box;
                }

                .profile-card__desc__header {
                    font-size: 20px;
                    margin-top: 10px;
                }

                .profile-card__desc__profile-url {
                    font-size: 12px;
                    margin: 4px 0;
                }

                .profile-card__desc__key-value {
                    font-size: 12px;
                }

            .profile-card__btn {
                width: 20%;
                display: inline-flex;
                align-items: flex-end;
                flex-direction: column-reverse;
            }

            .primary-btn {
                background: white;
                border: 1px solid #147ABC;
                color: #147ABC;
                border-radius: 3px;
                padding: 5px;
                cursor: pointer;
                width: 80px;
            }

            .profile-details {
                width: 100%;
                max-height: 200px;
                overflow-y: auto;
            }

                .profile-details__row {
                    width: 100%;
                    display: flex;
                    padding: 8px;
                    box-sizing: border-box;
                }

                .row-header {
                    border-bottom: 1px solid #ccc;
                    border-top: 1px solid #ccc;
                    font-weight: 600;
                    font-size: 16px;
                }

                .profile-details__row:nth-child(even) {
                    background: #F9F9F9;
                }
                .profile-details__col {
                    display: inline-block;
                    width: 50%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 12px;
                }
                .profile-details__col:first-child {
                    padding-left: 72px;
                }
            .not-available {
                padding: 10px;
                font-size: 20px;
                text-align: center;
                border-top: 1px solid #ccc;
                padding-bottom: 13px;
                font-weight: 600;
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);