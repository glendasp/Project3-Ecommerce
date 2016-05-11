a(href='productlist/#{product.name}') #{product.name}

form(action='/productlist/#{product._id}', method='post')
input(type='hidden', value=product._id, name=_id)
input(type='hidden', value='true', name="cart")
input.done_button(type='submit', class='add_cart', value='Add to Cart')

button.btn.btn-primary.btn-lg(type='submit') Add to Cart