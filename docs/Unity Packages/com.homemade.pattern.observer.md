# com.homemade.pattern.observer

:::info
Version: **1.0.1** <br/>
Github: **_[Link](https://github.com/hungpt17102k/com.homemade.pattern.observer)_** <br/>
Dependencies: 
- **[com.homemade.pattern.singleton](../Unity%20Packages/com.homemade.pattern.singleton.md)**
:::

<!-- Introduction -->
This is simple package for observer, can use in any project.

## 1. Import

### Download from my registries
- Open Package Manager in Unity.
- Select Packages tab: My Registries.
- Download package: **com.homemade.pattern.observer**
> **Follow the setup: [Click here](../Introduction.md#1-add-scope).**

### Import from github
- Link github: **[Link package](https://github.com/hungpt17102k/com.homemade.pattern.observer)**
- Open Package Manager in Unity 
> **Follow this guide: [Click here](../Introduction.md#import-from-github).**

## 2. How to use
:::note
Before use, you need to create a script name `EventID.cs`
:::

```cs
public enum EventID
{
    StartGame,
    EndGame,
}
```

Then you can use it more specific in any event

```cs
using com.homemade.pattern.observer;
```

## 3. Example

### Register/Remove listener

```cs
using com.homemade.pattern.singleton;

public class PlayerManager : MonoBehaviour
{
    private void Awake()
    {
        Observer.Instance.RegisterListener(EventID.StartGame, OnStartGame);
    }

    private void OnDestroy()
    {
        Observer.Instance.RemoveListener(EventID.StartGame, OnStartGame);
    }

    private void OnStartGame(object obj)
    {
        Debug.Log("Start game");
    }
}
```

:::tip
Instead of using 
```cs
Observer.Instance.RegisterListener(EventID.StartGame, OnStartGame);
Observer.Instance.RemoveListener(EventID.StartGame, OnStartGame);
```
You can use
```cs
this.RegisterListener(EventID.StartGame, OnStartGame);
this.RemoveListener(EventID.StartGame, OnStartGame);
```
:::

### Posting event

```cs
using com.homemade.pattern.singleton;

public class GameManager : MonoBehaviour
{
    private void Start()
    {
        Observer.Instance.PostEvent(EventID.StartGame);
    }
}
```

:::tip
Instead of using 
```cs
Observer.Instance.PostEvent(EventID.StartGame)
```
You can use
```cs
this.PostEvent(EventID.StartGame)
```
:::

### Passing value

You pass any type of value in method `PostEvent`

```cs
using com.homemade.pattern.singleton;

public class GameManager : MonoBehaviour
{
    private void Start()
    {
        int level = 1;

        Observer.Instance.PostEvent(EventID.StartGame, level);
    }
}
```

You need to parse to the correct value type that was passing from the `PostEvent`

```cs
public class PlayerManager : MonoBehaviour
{
    private void OnStartGame(object obj)
    {
        int level = (int) obj;
        Debug.Log("Start level: " + level);
    }
}
```

<!-- ## 4. Explain

- This singleton will automatic create an instance if it's not exist on scene.
- You don't need to attach the script to a GameObject, you can just call the class.
> **You can see the source code for more understand** -->

You can checkout this article, this package is based on it.
> #### **Reference:** _[Link Ref](https://thoxaylamcoder.wordpress.com/2016/02/24/observerpattern-trong-unity3d/)_