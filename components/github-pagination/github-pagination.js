import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

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
      </style>
    `;
  }
  static get properties() {
    return {
        totalCount: {
            type: Number
        },
        paginationValue: {
            type: Array,
            value: [],
            computed: '_GeneratePageNo(totalCount)'
        }
    };
  }

  _GeneratePageNo(totalCount) {
      this.paginationValue = [];
      let noOfPages = Math.floor(totalCount/30);
      console.log('hello : ', noOfPages);
      
      for (let i = 1;i<= noOfPages; i++) {
          this.push('paginationValue', i);
      }
      console.log(this.paginationValue);      
  }

  _OnKeyPressed(e) {
    if (13 === e.charCode) {
      this.dispatchEvent(
        new CustomEvent("enter", {
          detail: { searchedKey: this.searchKey }
        })
      );
    }
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
