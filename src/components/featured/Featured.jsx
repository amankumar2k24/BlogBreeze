import React from 'react'
import styles from "./featured.module.css"
import Image from 'next/image'

const Featured = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1 >Hey welcome to Blog Breeze !</h1>
                <p>
                    Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways.
                </p>
            </div>

            <div className={styles.main}>
                <div className={styles.image}>
                    <Image alt="img" className={styles.img} width={400} height={270} src="/homeLogo.webp" priority />
                </div>
                <div className={styles.content} >
                    <h2 className={styles.heading} >
                        LET US HOLD TIGHTLY WITHOUT WAVERING TO THE HOPE WE AFFIRM, FOR GOD CAN BE TRUSTED TO KEEP HIS PROMISE.
                    </h2>
                    <div className={styles.btn}>Mistery Continuous with my journey</div>
                    <p className={styles.desc}>
                        My family and I went to Missouri over the summer to visit my mom. Misery you say? Yes, that&apos;s what I said. The weather was very hot and humid. My mom lives about 30 miles from Branson. If you haven&apos;t been to Branson—it&apos;s like Disneyland for people who love Jesus. There are a lot of entertainment shows and family attractions. You know how families go to Disneyland with matching t-shirts? Well, Branson...same…except they all have Bible verses on the back instead of Mickey Mouse. <br />

                        On this trip, my kids wanted to try another mountain coaster. I say another because there are 3 mountain coasters in Branson and the last time we visited my mom, they LOVED the mountain coaster we went on. When they found out there were 2 more of them, they came up with their own “mountain coaster bucket list of sorts. So, for 2023, we decided to conquer the Copperhead Mountain Coaster which is at the top of Shepherd of the Hills, the highest point in Southwest Missouri.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Featured