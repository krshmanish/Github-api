import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import TEMPLATE from "./github-header-template";
import "./github-header-css";

/**
 * `github-element`
 * Github api integration
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GithubHeader extends PolymerElement {
  static get template() {
    var oTemplate = document.createElement("template");
    oTemplate.innerHTML = TEMPLATE;
    return oTemplate;
  }
  static get properties() {
    return {
      searchKey: {
        type: String,
        value: "",
        notify: true
      },
      filterValue: {
        type: String,
        value: "sort=name&order=asc",
        notify: true
      }
    };
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

  _OnSelectFilter(event) {
    this.filterValue = event.target.value;
    this.dispatchEvent(
      new CustomEvent("filter", {
        detail: { filterValue: this.filterValue }
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

window.customElements.define("github-header", GithubHeader);
