                let cartItemTemplate = `
                    <div class="card" style="width: 18rem;" cart-id="@ITEMID">
                        <div class="card-body">
                            <table class="table table-borderless" cellspacing="30">
                                <tr>
                                    <td rowspan="4" style="background-image:url('@ITEMIMAGE');width:150px;background-size: cover;background-position: center;">
                                    </td>
                                    <td><h5 class="card-title">@ITEMTITLE</h5></td>
                                </tr>
                                <tr><td><b>Price</b> <p class="card-text">PHP. @ITEMPRICE</p></td></tr>
                                <tr>
                                    <td><b>Qty:</b> <input class="item-quantity" type="number" min="1" value="1" style="width:100%;" onchange="changeQuantityCart(event)"\></td>
                                </tr>
                                <tr>
                                    <td><button class="btn btn-primary remove-item-btn" style="white-space: nowrap;" onclick="removeItemCart(event)"><i class="bi bi-trash"></i> Remove</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;
                let myCart = [];

                function addToCart(title,price,pImage, pId) {
                    if( !myCart.find( item => item.id == pId ) ) {
                        let htmlParser = new DOMParser();
                        let cartItemElement = htmlParser.parseFromString( cartItemTemplate.replace('@ITEMTITLE',title).replace('@ITEMPRICE',price).replace('@ITEMIMAGE',pImage).replace('@ITEMID',pId), "text/html" );
                        myCart.push({
                            id:pId,
                            name:title,
                            price:Number(price),
                            quantity:1,
                            image:pImage,
                            element:cartItemElement.documentElement
                        });
                        document.querySelector('#my-cart-list').appendChild(cartItemElement.documentElement);
                    } else {
                        let foundItem = myCart.find( item => item.id == pId );
                        foundItem.quantity += 1;
                        myCart.find( item => item.id == pId ).element.querySelector('input[type="number"]').value = foundItem.quantity;
                    }
                    computeMyCart();
                }

                function computeMyCart() {
                    if(myCart.length >= 1) {
                        if(!!document.querySelector('#empty-item')) document.querySelector('#empty-item').remove();
                        document.querySelector('.badge').classList.remove("d-none");
                    } else {
                        document.querySelector('#my-cart-list').innerHTML = '<span id="empty-item">No items yet</span>';
                        document.querySelector('.badge').classList.add("d-none");
                    }
                    document.querySelector('.badge').innerText = myCart.length;
                    document.querySelector('#cart-orders').innerText = myCart.length;
                    let cartTotal = 0; 
                    myCart.forEach(item=>cartTotal+=(item.price*item.quantity));
                    document.querySelector('#cart-total').innerText = cartTotal;
                }

                function removeItemCart(eventData){
                    let itemCartContainerElement = eventData.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    let itemCCEId = itemCartContainerElement.getAttribute('cart-id');
                    myCart.splice(myCart.indexOf(myCart.find( item => item.id == itemCCEId)), 1);
                    console.log(myCart)
                    computeMyCart();
                    itemCartContainerElement.remove();
                }

                function changeQuantityCart(eventData){
                    console.log(eventData.srcElement.value)
                    let itemCartContainerElement = eventData.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    let itemCCEId = itemCartContainerElement.getAttribute('cart-id');
                    myCart.find( item => item.id == itemCCEId).quantity = Number(eventData.srcElement.value);
                    computeMyCart();
                }

                document.querySelectorAll(".add-item-btn").forEach( domElement => {
                    domElement.addEventListener("click", function(event){
                        let productName = event.srcElement.parentNode.querySelector('.product-name').innerText;
                        let productPrice = event.srcElement.parentNode.querySelector('.product-price').innerText.replace('P','');
                        let productImage = event.srcElement.parentNode.parentNode.querySelector('.product-image').getAttribute('src');
                        let productId = event.srcElement.parentNode.querySelector('.product-name').getAttribute('id');
                        addToCart( productName, productPrice, productImage, productId );
                    });
                });