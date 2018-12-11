import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import TEMPLATE from "./card-details-template";
import "./card-details-css";
import "@polymer/polymer/lib/elements/dom-repeat";
import "@polymer/polymer/lib/elements/dom-if";

/**
 * `github-element`
 * Github api integration
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CardDetails extends PolymerElement {
  static get template() {
    var oTemplate = document.createElement("template");
    oTemplate.innerHTML = TEMPLATE;
    return oTemplate;
  }
  static get properties() {
    return {
      isCollapsed: {
        type: Boolean,
        value: false
      },
      buttonValue: {
        type: String,
        value: "Details"
      },
      cardData: Object,
      repoData: Array,
      isDataAvailable: Boolean
    };
  }

  _onDetailsClick() {
    this.repoData = [];
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this._GetData(this.cardData.repos_url).then(
        response => {
          this.repoData = JSON.parse(response);
          this.buttonValue = 'Collapsed';
          this.isDataAvailable = this.repoData.length ? true : false;
        },
        error => {
          console.log("helllll : ", error);
        }
      );
    } else {
        this.buttonValue = 'Details';
    }
  }

  _GetData(url) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open("GET", url);

      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(
            Error(
              "An error occurred while getting data. error code : " +
                request.statusText
            )
          );
        }
      };
      request.send();
    });
  }
  _getLanguage(language) {
    return language ? language : "NA";
  }
}

window.customElements.define("card-details", CardDetails);
