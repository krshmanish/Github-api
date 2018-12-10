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
          <div class="total-count">Total Results : [[cardData.total_count]], Page Limit : 30, Page No. [[pageNo]]</div>
        </template>
          <template is='dom-if' if="{{!cardData}}">
            <div class="fa fa-spinner fa-spin"></div>
          </template>
        <template is="dom-repeat" items="[[cardData.items]]">
          <card-details card-data="{{item}}"></card-details>
        </template>
        <github-pagination total-count="{{cardData.total_count}}" on-pageclick="_onPageClick" selected-page="{{pageNo}}"></github-pagination>
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
      },
      filterValue: String
    };
  }

  ready() {
    super.ready();
    this.searchedKey = 'Manishkumar';
    let event = {
      detail: {
        searchedKey: this.searchedKey
      }
    };
    this._SearchedKey(event);
  }

  _onPageClick(e) {    
    this.pageNo = e.detail.pageNo;
    this.cardData = null;
    this._getData();
  }

  _OnSelectFilter(e) { 
    this.cardData = null;
    this.pageNo = 1;
    this.filterValue = e.detail.filterValue;
    this._getData();
  }

  _SearchedKey(e) {
    this.cardData = null;
    this.pageNo = 1;
    this.searchedKey = e.detail.searchedKey;
    this._getData();
  }

  _getData() {
    this.cardData = null;
    this._onApiCall(this.searchedKey, this.pageNo, this.filterValue).then(response => {
      this.cardData = JSON.parse(response);
      console.log(this.cardData);
    }, error => {
      console.log('Hello : ', error);      
    });
  }

  _onApiCall(searchKey, pageNo, filterValue) {    
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://api.github.com/search/users?page=" + pageNo + "&q="+ searchKey + "&" + filterValue);

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
