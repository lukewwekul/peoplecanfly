
function appGunStore(){
    console.log('startApp ok...');

//******************************//
//***   LOAD JSON FILES    ***//
    function loadGunsList(urlArg){
        let loadJson = new XMLHttpRequest();
        loadJson.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                let gunsList = JSON.parse(this.responseText);
                console.log('load guns.json ok...');
                loadPlayerData("js/player.json", gunsList);
            }
        };
        loadJson.open("GET", urlArg, true);
        loadJson.send();
    }

    function loadPlayerData(urlArg, gunsListArg){
        let loadJson = new XMLHttpRequest();
        loadJson.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                let playerData = JSON.parse(this.responseText);
                console.log('load player.json ok...');
                makeShop(gunsListArg, playerData);
            }
        };
        loadJson.open("GET", urlArg, true);
        loadJson.send();
    }



//************************************//
//***   SHOP - MAKEandSERVICES    ***//
    function makeShop(gunsArg, playerArg){
        console.log('makeShop start...');
        appHelper.load(playerArg, gunsArg);

        function makeShelves(){
            console.log('makeShelves start...');
            for (let i=0; i<gunsArg.guns.length; i++){

                let divLeft = document.getElementById('divLeft'),
                    newGunCrate = document.createElement('div'),
                    gunName = document.createElement('div'),
                    gunNewInfo = document.createElement('div'),
                    gunNewInfoText = document.createElement('span'),
                    gunPhoto = document.createElement('img'),
                    gunShopInfo = document.createElement('div'),
                    moneyShape = document.createElement('div'),
                    gunNameText = document.createTextNode(gunsArg.guns[i].name),
                    gunShopInfoText = document.createTextNode(gunsArg.guns[i].price);

                gunPhoto.src = 'img/' + gunsArg.guns[i].img;
                gunPhoto.className = 'gunImg';

                gunName.appendChild(gunNameText);
                gunShopInfo.appendChild(gunShopInfoText);
                gunShopInfo.appendChild(moneyShape);
                newGunCrate.appendChild(gunName);
                gunNewInfo.appendChild(gunNewInfoText);
                newGunCrate.appendChild(gunNewInfo);
                newGunCrate.appendChild(gunPhoto);
                newGunCrate.appendChild(gunShopInfo);

                newGunCrate.className = 'gunCrate';
                gunName.className = 'gunName';
                gunNewInfo.className = 'gunNewInfo';
                gunNewInfoText.className = 'gunNewInfoText';
                gunShopInfo.className = 'gunShopInfo gunPriceOk';
                moneyShape.className = 'moneyShape';

                newGunCrate.id = 'gunCrate' + (1000 + i);
                gunNewInfo.id = newGunCrate.id + 'NewInfo';
                gunName.id = newGunCrate.id + 'Name';
                gunPhoto.id = newGunCrate.id + 'Photo';
                gunShopInfo.id = newGunCrate.id + 'ShopInfo';
                gunNameText.id = newGunCrate.id + 'NameText';
                gunShopInfoText.id = newGunCrate.id + 'ShopInfoText';

                newGunCrate.onclick = function(){appHelper.addCart(this.id);};

                divLeft.appendChild(newGunCrate);

                if (gunsArg.guns[i].new) gunNewInfoText.innerHTML = '&nbspNew&nbsp';
            }
            console.log('makeShelves ok...');
        }

        makeShelves();
        appHelper.checkGunsPrices();
        makeCart(playerArg);
    }



    function makeCart(playerArg){
        let divFunds = document.getElementById('divFunds'),
            divFundsTitle = document.createElement('div'),
            fundsTitleText = document.createTextNode('Available funds'),
            divFundsAmount = document.createElement('div'),
            fundsAmountText = document.createTextNode(playerArg.player[0].funds);

        divFunds.appendChild(divFundsTitle);
        divFundsTitle.appendChild(fundsTitleText);
        divFundsAmount.appendChild(fundsAmountText);
        divFunds.appendChild(divFundsAmount);

        divFundsTitle.id = 'divFundsTitle';
        divFundsAmount.id = 'divFundsAmount';


        let divCart = document.getElementById('divCart'),
            cartHwMnItems = document.createElement('div'),
            cartHwMnItemsText = document.createTextNode('0 items in cart'),
            cartFirstHr = document.createElement('hr'),
            cartBuy = document.createElement('div'),
            cartBuyText = document.createTextNode('Buy for '),
            cartBuyAmount = document.createElement('span');

        cartHwMnItems.id = 'cartHwMnItems';
        cartFirstHr.id = 'cartFirstHr';
        cartBuyAmount.id = 'cartBuyAmount';
        cartBuy.id = 'cartBuy';

        cartHwMnItems.appendChild(cartHwMnItemsText);
        divCart.appendChild(cartHwMnItems);
        divCart.appendChild(cartFirstHr);
        cartBuy.appendChild(cartBuyText);
        cartBuy.appendChild(cartBuyAmount);
        divCart.appendChild(cartBuy);

        divFundsAmount.innerHTML = appHelper.money + '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';
        cartBuyAmount.innerHTML = appHelper.cartValue + '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';

        cartBuy.onclick = function(){appHelper.buyCart();};
    }



    function shopService(idArg){
        console.log('click ' + idArg);

        if (document.getElementById('cart-' + idArg)) {console.log('exist in cart');}
        else {
            let gunId = parseInt(idArg.slice(8,12)) - 1000,
                cartShelf = document.createElement('div'),
                cartShelfHalfLeft = document.createElement('div'),
                cartShelfName = document.createElement('div'),
                cartShelfImg = document.createElement('img'),
                cartShelfHalfRight = document.createElement('div'),
                cartShelfAmount = document.createElement('div'),
                cartShelfHr = document.createElement('hr');

            cartShelf.id = 'cart-' + idArg;
            cartShelf.className = 'cartShelf';
            cartShelfHalfLeft.className = 'cartShelfHalfLeft';
            cartShelfName.className = 'cartShelfName';
            cartShelfImg.className = 'cartShelfImg';
            cartShelfHalfRight.className = 'cartShelfHalfRight';
            cartShelfAmount.className = 'cartShelfAmount';
            cartShelfHr.className = 'cartShelfHr';

            cartShelf.appendChild(cartShelfHalfLeft);
            cartShelfHalfLeft.appendChild(cartShelfName);
            cartShelfHalfLeft.appendChild(cartShelfImg);

            cartShelf.appendChild(cartShelfHalfRight);
            cartShelfHalfRight.appendChild(cartShelfAmount);

            cartShelf.appendChild(cartShelfHr);

            cartShelfName.innerHTML = document.getElementById(idArg + 'Name').innerHTML;
            cartShelfImg.src = document.getElementById(idArg + 'Photo').src;
            cartShelfAmount.innerHTML = document.getElementById(idArg + 'ShopInfo').innerHTML;

            cartShelf.onclick = function(){console.log('click ' + this.id + ' in cart'); appHelper.delCart(this.id, gunId);};

            document.getElementById('divCart').insertBefore(cartShelf, document.getElementById('cartBuy'));
        }
    }



    let appHelper = {
        gunsData: null,
        money: 0,
        guns: [],
        gunsInCart: [],
        cartValue: 0,

        load: function(dataArg, gunsArg){
            this.money = dataArg.player[0].funds;
            this.guns = dataArg.player[0].guns;
            this.gunsData = gunsArg;
        },

        addCart: function(idArg){
            let gunId = parseInt(idArg.slice(8,12)) - 1000;
            if (document.getElementById('cart-' + idArg)) {console.log('exist in cart');}
            else if (!this.checkBuyPossibility(gunId)) {console.log('owned');}
            else if ((this.money - this.gunsData.guns[gunId].price - this.cartValue)>=0){
                this.cartValue += this.gunsData.guns[gunId].price;
                document.getElementById('cartBuyAmount').innerHTML = this.cartValue+ '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';
                shopService(idArg);
                this.gunsInCart.push(gunId);
                this.checkGunsPrices();
            }
            else {console.log('too expensive');}

            document.getElementById('cartHwMnItems').innerHTML = this.gunsInCart.length + ' items in cart';
        },

        delCart: function(divIdArg, idArg){
            console.log('delCart ' + divIdArg);
            console.log('element tablicy do usunięcia ' + this.gunsInCart.indexOf(idArg));
            this.gunsInCart.splice(this.gunsInCart.indexOf(idArg), 1);
            console.log('element tablicy po usunięciu ' + this.gunsInCart.indexOf(idArg));
            this.cartValue -= this.gunsData.guns[idArg].price;
            document.getElementById('divCart').removeChild(document.getElementById(divIdArg));
            this.checkGunsPrices();
            document.getElementById('cartHwMnItems').innerHTML = this.gunsInCart.length + ' items in cart';
            document.getElementById('cartBuyAmount').innerHTML = this.cartValue + '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';
        },

        buyCart: function(){
            if (this.gunsInCart.length){
                console.log('buy cart');
                for (let i=0; i<this.gunsInCart.length; i++){
                    this.guns.push(this.gunsInCart[i]);
                    document.getElementById('divCart').removeChild(document.getElementById('cart-gunCrate' + (1000+this.gunsInCart[i])));
                }
                this.money -= this.cartValue;
                this.cartValue = 0;
                this.gunsInCart.splice(0,this.gunsInCart.length);
                document.getElementById('cartHwMnItems').innerHTML = this.gunsInCart.length + ' items in cart';
                document.getElementById('cartBuyAmount').innerHTML = this.cartValue + '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';
                document.getElementById('divFundsAmount').innerHTML = this.money + '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';
                this.checkGunsPrices();
            }
        },

        checkGunsPrices: function(){
            for (let i=0; i<this.gunsData.guns.length; i++){
                if(this.guns.indexOf(i)!==-1){
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').innerHTML = 'Owned';
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').className = 'gunShopInfo gunOwned';
                }
                else if(this.gunsInCart.indexOf(i)!==-1){
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').innerHTML = 'In cart';
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').className = 'gunShopInfo gunInCart';
                }
                else if (this.money - this.cartValue < this.gunsData.guns[i].price){
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').className = 'gunShopInfo gunTooExpensive';
                }
                else {
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').innerHTML = this.gunsData.guns[i].price + '<span class="moneyShape">&nbsp&nbsp&nbsp</span>';
                    document.getElementById('gunCrate' + (1000+i) + 'ShopInfo').className = 'gunShopInfo gunPriceOk';
                }
            }
        },

        checkBuyPossibility: function(idArg){
            if(this.guns.indexOf(idArg)!==-1){return false;}
            if(this.gunsInCart.indexOf(idArg)!==-1){return false;}
            return true;
        }
    }

    loadGunsList("js/guns.json");
}
