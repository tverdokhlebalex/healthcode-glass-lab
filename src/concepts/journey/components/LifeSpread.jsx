import { ArrowDown, Check } from "lucide-react";
import { assetPath } from "../../../media.js";
import { FadeUp } from "../../../motion/FadeUp.jsx";
import styles from "./LifeSpread.module.css";

export function LifeSpread() {
  return <section className={styles.life} id="life">
    <div className={styles.sectionBar}><span>Питание без лишней сложности</span><ArrowDown size={20}/></div>
    <div className={styles.layout}>
      <FadeUp className={styles.copy}>
        <h2>Полезно —<br/>и по-настоящему<br/><em>вкусно.</em></h2>
        <p className={styles.lead}>Рацион должен подходить не только вашей цели, но и вам самим.</p>
        <p>Любимые продукты, время на готовку, обеды вне дома — всё это важно. Вместе со специалистом вы находите изменения, которые можно сохранить в обычной жизни.</p>
        <ul><li><Check size={18}/> Учитываем вкусы и предпочтения</li><li><Check size={18}/> Обсуждаем доступные замены продуктов</li><li><Check size={18}/> Начинаем с посильных изменений</li></ul>
        <a href="#programs">Посмотреть, что входит в программу <span aria-hidden="true">↗</span></a>
      </FadeUp>
      <figure className={styles.food}>
        <img src={assetPath("images/journey-food.webp")} width="1536" height="1024" loading="lazy" alt="Сочный запечённый лосось, чечевица, свежие овощи и зелень на керамической тарелке"/>
        <figcaption><span>Еда, которой хочется наслаждаться</span><span>Пример сервировки</span></figcaption>
      </figure>
    </div>
  </section>;
}
