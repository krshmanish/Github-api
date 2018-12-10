export default `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <style include="widget-header-css"></style>
        <div class="container">
            <div class="container__part">
                <select class="input-box" on-change="_OnSelectFilter">
                    <option value="sort=stars&order=asc">Name (A - Z)</option>
                    <option value="sort=stars&order=desc">Name (Z - A)</option>
                    <option value="sort=score&order=asc">Rank Up</option>
                    <option value="sort=score&order=Desc">Rank Down</option>
                </select>
            </div>
            <div class="container__part">
                <input type="text" class="input-box fa fa-search" value="{{searchKey::input}}" on-keypress="_OnKeyPressed">
            </div>
        </div>`;
