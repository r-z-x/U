<template>
  <div class="page">
    <!-- 头部 -->
    <header class="headCon">
      <a href="details.html">
        <img src="@/assets/images/arrowLeft22.jpg" alt="后退" />
      </a>
      <div class="logo"><p>确认订单</p></div>
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- 地址 -->
    <div class="meAdd">
      <a href="#">
        <p>
          <span>收货人:YouSu</span>
          <span>1000000000</span>
        </p>
        <p class="clearfix">
          <span class="fl">收货地址:</span
          ><span class="fl"
            >北京市海淀区隐泉路清林苑6号楼中公优就业总部3层</span
          >
        </p>
      </a>
    </div>
    <div class="mation">
      <ul>
        <li class="clearfix">
          <img class="fl" src="@/assets/images/index/shop_4.jpg" alt="商品" />
          <div class="fl">
            <p>雅诗兰黛护肤霜</p>
            <p>规格：50g</p>
          </div>
          <p class="fr">&yen;123.00</p>
        </li>
        <li class="clearfix">
          <p class="fl">购买数量：</p>
          <div class="clearfix fr">
            <span class="fl">-</span>
            <input class="fl" type="text" value="1" />
            <span class="fl">+</span>
          </div>
        </li>
      </ul>
      <p class="clearfix">
        <span class="fl">配送方式</span>
        <span class="fr">xx快递</span>
      </p>
    </div>
    <div class="coupon">
      <p class="clearfix">
        <span class="fl">优惠券</span>
        <span class="fr">无可用</span>
      </p>
      <div class="couponBot clearfix">
        <p class="fl">使用积分</p>
        <form class="fr clearfix" action="#">
          <input class="fl" type="text" placeholder="输入积分" name="积分" />
          <input class="fl" type="submit" value="使用" />
          <p class="fl">可用<span>50</span>积分</p>
        </form>
      </div>
    </div>
    <div class="settlement">
      <p><span>商品金额</span><span>&yen;123.00</span></p>
      <p><span>运费</span><span>+&yen;0.00</span></p>
      <p><span>优惠券</span><span>-&yen;0.00</span></p>
      <p><span>会员优惠</span><span>-&yen;0.00</span></p>
      <p><span>积分折扣</span><span>-&yen;0.00</span></p>
      <p><span>实际金额：</span><span>&yen;123.00</span></p>
      <div>
        <a href="#">提交订单</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="" scoped>
@import "../../assets/css/confirm.css";
</style>