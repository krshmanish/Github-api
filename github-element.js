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
        .spin-container {
          font-size: 70px;
          text-align: center;
          padding: 40px 0px;
        }
        .err-container {
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 22px;
        }
        .err-msg {
          color: red;
          font-size: 22px;
          padding: 22px;
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
      .input-page-limit {
        width: 40px;
      }
      </style>
      <github-header
        search-key="{{searchedKey}}"
        on-filter="_OnSelectFilter"
        on-enter="_SearchedKey"
      ></github-header>
      <template is="dom-if" if="{{isAPIRespond}}">
        <div class="body-container">
          <template is='dom-if' if="{{cardData.total_count}}">
            <div class="total-count">Total Results : [[cardData.total_count]], Page Limit : 
            <input class="input-page-limit" type="number" value="{{pagelimit::input}}" on-keypress="_OnKeyPressed">
            , Page No. [[pageno]]</div>
            <template is="dom-repeat" items="[[cardData.items]]">
              <card-details card-data="{{item}}"></card-details>
            </template>
            <github-pagination total-count="{{cardData.total_count}}" on-pageclick="_onPageClick" selected-page="{{pageno}}" per-page="{{pagelimit}}"></github-pagination>
          </template>
          <template is='dom-if' if="{{!cardData}}">
            <div class="spin-container">
              <div class="fa fa-spinner fa-spin"></div>
            </div>
          </template>
        </div>
      </template>
      <template is="dom-if" if="{{!isAPIRespond}}">
        <div class="err-container">
          <div class="err-msg">Upprocessable Entity</div>
          <button on-click="_gotoInitialPage" class="primary-btn">Go TO First Page</button>
        </div>
      </template>
    `;
  }

  constructor() {
    super();
  }

  static get properties() {
    return {
      searchedKey: {
        type: String,
        value: "Manishkumar"
      },
      cardData: {
        type: Object,
        notify: true
      },
      pageno: {
        type: Number,
        value: 1,
        observer: "_updatePageDetails"
      },
      filterValue: {
        type: String,
        value: "sort=stars&order=asc"
      },
      pagelimit: {
        type: Number,
        value: 10,
        observer: "_updatePageDetails"
      },
      isAPIRespond: {
        type: Boolean, 
        value: true
      },
      widgetid: String,
      dashboardid: String
    };
  }

  ready() {
    super.ready();
    this._getData();
  }

  _updatePageDetails(newValue) {
    if(newValue) {
       this.dispatchEvent(new CustomEvent('WorkspaceWidgetEvent', {
        bubbles: true,
        composed: true,
        detail : {
          eventType: 'UpdateSettingsEvent',
          data: {
              dashboardId: this.dashboardid,
              widgetId: this.widgetid,
              settings: [ 
                {
                   accessor: 'perpage',
                   value: parseInt(this.pagelimit)
                },
                {
                   accessor: 'pageno',
                   value: parseInt(this.pageno)
                }
              ]
          }
        }
       }));
       this._getData();
    }
  }

  _OnKeyPressed(e) {
    if (13 === e.charCode) {
      this._gotoInitialPage();
    }
  }

  _gotoInitialPage() {
    this.pageno = 1;
    this._getData();
  }

  _onPageClick(e) {    
    this.pageno = e.detail.pageNo;
    this._getData();
  }

  _OnSelectFilter(e) { 
    this.pageno = 1;
    this.filterValue = e.detail.filterValue;
    this._getData();
  }

  _SearchedKey(e) {
    this.pageno = 1;
    this.searchedKey = e.detail.searchedKey;
    this._getData();
  }

  _getData() {
    this.cardData = null;
    this._onApiCall(this.searchedKey, this.pageno, this.filterValue).then(response => {
      this.cardData = JSON.parse(response);
      this.isAPIRespond = true;
    }, error => {
      this.isAPIRespond = false;    
    });
  }

  _onApiCall(searchKey, pageno, filterValue) {    
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://api.github.com/search/users?page=" + pageno + "&per_page=" + this.pagelimit + "&q="+ searchKey + "&" + filterValue);

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
