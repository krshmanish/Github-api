import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat";
import "@polymer/polymer/lib/elements/dom-if";

/**
 * `github-pagination`
 * Github api integration
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GithubPagination extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          text-align: justify;
        }
        .pagination-link {
          display: inline-block;
          padding: 0 4px;
          text-align: center;
          cursor: pointer;
        }
        a:hover {
          color: #147abc;
          font-weight: 600;
        }

        .active-page {
          color: #147abc;
          border-bottom: 1px solid;
          font-weight: 600;
          font-size: 20px;
          line-height: 20px;
        }
      </style>
      Page No : 
      <template is="dom-repeat" items="[[paginationValue]]" as="pageNo" restamp="true">
        <a
          class$="pagination-link {{_getActivePage(pageNo,selectedPage)}}"
          on-click="_gotoPageNo"
          >[[pageNo]]</a
        >
      </template>
    `;
  }
  static get properties() {
    return {
      totalCount: {
        type: Number,
        observer: "_totalCountChanged"
      },
      paginationValue: {
        type: Array,
        value: []
      },
      selectedPage: {
        type: Number,
        value: 1,
        notify: true
      },
      perPage: Number
    };
  }

  _getActivePage(pageNo,selectedPage) {
    return pageNo === selectedPage ? "active-page" : "";
  }

  _totalCountChanged(newValue) {
    if (newValue) {
      this.paginationValue = [];
      this._GeneratePageNo(newValue);
    }
  }

  _GeneratePageNo(totalCount) {
    let noOfPages = Math.ceil(totalCount / this.perPage);
    for (let i = 1; i <= noOfPages; i++) {
      this.push("paginationValue", i);
    }
  }

  _gotoPageNo(e) {
    this.selectedPage = e.model.get("pageNo");
    console.log(this.selectedPage);

    this.dispatchEvent(
      new CustomEvent("pageclick", {
        detail: { pageNo: this.selectedPage }
      })
    );
  }

  ready() {
    super.ready();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

window.customElements.define("github-pagination", GithubPagination);
