# Field Types
### userResolvable
| Name      | Example                 |
|-----------|-------------------------|
| username  | `Yaku`                  |
| usertag   | `Yaku#0543`             |
| regexp    | `(.*?)#5951`            |
| snowflake | `681919237706612743`    |
| mention   | `<@681919237706612743>` |

### memberResolvable
> extends [userResolvable](#userResolvable)

| Name           | Example       |
|----------------|---------------|
| nickname       | `Yakuwu`      |
| displayNameTag | `Yakuwu#0543` |

### Boolean
> See more [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean )

| Name      | Example        |
|-----------|----------------|
| Literal   | `true` `false` |
| Numerical | `1` `0`        |
| Textual   | `yes` `no`     |