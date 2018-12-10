import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "./components/widget-header/github-header.js";
import "./components/card-details/card-details.js";
import "./components/github-pagination/github-pagination.js";

import '@polymer/polymer/lib/elements/dom-repeat';

/**
 * `github-element`
 * Github api integration
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GithubElement extends PolymerElement {
  static get template() {
    return html`
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
        :host {
          display: block;
          background: #f6f6f6;
          height: 100%;
        }
        .body-container {
          padding: 6px;
          overflow-y: auto;
          height: calc(100% - 82px);
          box-sizing: border-box;
        }
        .total-count {
          padding: 10px 0px;
          font-size: 14px;
        }
      </style>
      <github-header
        search-key="{{searchedKey}}"
        on-filter="_OnSelectFilter"
        on-enter="_SearchedKey"
      ></github-header>
      <div class="body-container">
        <template is='dom-if' if="{{cardData.total_count}}">
          <div class="total-count">Total Results : [[cardData.total_count]]</div>
        </template>
          <template is='dom-if' if="{{!cardData}}">
            <div class="fa fa-spinner fa-spin"></div>
          </template>
        <template is="dom-repeat" items="[[cardData.items]]">
          <card-details card-data="{{item}}"></card-details>
        </template>
        <github-pagination total-count="{{cardData.total_count}}"></github-pagination>
      </div>
    `;
  }

  constructor() {
    super();
  }
  static get properties() {
    return {
      searchedKey: {
        type: String,
        value: "",
        notify: true
      },
      cardData: {
        type: Object,
        notify: true
      },
      pageNo: {
        type: Number,
        value: 1,
        notify: true
      }
    };
  }

  ready() {
    super.ready();
    this.searchedKey = 'Manishkumar-coditas';
    let event = {
      detail: {
        searchedKey: this.searchedKey
      }
    };
    this._SearchedKey(event);
  }

  _OnSelectFilter(e) { 
    this.cardData = null;
    this._GetData(this.searchedKey + '&' + e.detail.filterValue).then(response => {
      this.cardData = JSON.parse(response);
      console.log(this.cardData);
    }, error => {
      console.log('Hello : ', error);      
    });  
  }

  _SearchedKey(e) {
    this.cardData = null;
    this._GetData(e.detail.searchedKey).then(response => {
      this.cardData = JSON.parse(response);
      console.log(this.cardData);
    }, error => {
      console.log('Hello : ', error);      
    });
  }

  _GetData(key) {    
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://api.github.com/search/users?page=" + this.pageNo + "&q="+ key);

      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error("An error occurred while getting data. error code : " + request.statusText ));
        }
      };
      request.send();
    });
  }
}

window.customElements.define("github-element", GithubElement);
