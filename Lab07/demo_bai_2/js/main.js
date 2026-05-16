'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
        updateTotal();
    });

    /*-------------------
	Bổ sung hàm updateTotal()
	--------------------- */
    function updateTotal(){
        var solg=document.getElementById('quantity').value;
        var gia=document.getElementsByClassName('shoping_cart_price')[0];
        var tong=solg*parseFloat(gia.innerText);
        document.getElementById('total').innerText=tong.toFixed(3)+'dong';
    }
   
    // Lấy các phần tử
    const quantityInput = document.getElementById('quantity');
    const totalPriceEl = document.getElementById('total');

    // Giá sản phẩm (bạn có thể lấy từ HTML hoặc database)
    const pricePerItem = 76300; // 76.300 đ
    // Bắt sự kiện khi số lượng thay đổi
    quantityInput.addEventListener('input', updateTotal);

    // Khởi tạo giá trị ban đầu
    updateTotal();
    
    const UNIT_PRICE = 76.300; // Giá 1 cuốn sách
    const qtyInput  = document.getElementById('quantity');
    const totalCell = document.getElementById('total');

    function formatVND(n) {
        return n.toLocaleString('vi-VN') + ' ₫';
    }

    function updateTotal() {
        const qty   = parseInt(qtyInput.value) || 1;
        const total = UNIT_PRICE * qty;
        totalCell.innerHTML = formatVND(total);

        // Cập nhật Tổng phụ & Tổng ở phần checkout
        document.querySelectorAll('.shoping__checkout span').forEach(el => {
            el.textContent = formatVND(total);
        });
    }

    document.getElementById('btn-plus').addEventListener('click', function () {
        const cur = parseInt(qtyInput.value) || 1;
        qtyInput.value = cur + 1;
        updateTotal();
    });

    document.getElementById('btn-minus').addEventListener('click', function () {
        const cur = parseInt(qtyInput.value) || 1;
        if (cur > 1) { qtyInput.value = cur - 1; updateTotal(); }
    });

    updateTotal(); // Tính ngay khi trang load

})(jQuery);