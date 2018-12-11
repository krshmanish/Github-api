export default `
        <style include="card-details-css"></style>
        <div class="profile-card">
            <div class="profile-card__img">
                <img src="{{cardData.avatar_url}}" class="repo-icon">
            </div>
            <div class="profile-card__desc">
                <div class="profile-card__desc__header">[[cardData.login]]</div>
                <div class="profile-card__desc__profile-url">Profile URL : 
                    <a href="{{cardData.html_url}}" target="new">[[cardData.html_url]]</a>
                </div>
            </div>
            <div class="profile-card__btn">
                <button class="primary-btn" on-click="_onDetailsClick">[[buttonValue]]</button>
            </div>
        </div>
        <template is="dom-if" if="{{isCollapsed}}">
            <template is="dom-if" if="{{isDataAvailable}}">
                <div class="profile-details">
                    <div class="profile-details__row row-header">
                        <div class="profile-details__col" >NAME</div>
                        <div class="profile-details__col">LANGUAGE</div>
                    </div>
                    <template is="dom-repeat" items="[[repoData]]">
                        <div class="profile-details__row">
                            <a class="profile-details__col" href="{{item.html_url}}" target='new'>[[item.name]]</a>
                            <div class="profile-details__col">[[item.language]]</div>
                        </div>
                    </template>
                </div>
            </template>
            <template is="dom-if" if="{{!isDataAvailable}}">
                <div class="not-available">Empty Repository !</div>
            </template>
        </template>
        `;